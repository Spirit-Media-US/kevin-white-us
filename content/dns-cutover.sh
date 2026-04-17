#!/bin/bash
# DNS cutover for kevinwhite.us → Cloudflare Pages (Pattern 1)
# Run AFTER Kevin merges dev → main and the production deploy completes.
#
# Safe: only touches apex A + www CNAME. MX, SPF, DKIM, DMARC stay intact.
# Current state (2026-04-17):
#   apex A   161.35.131.217          (old WordPress — will be replaced)
#   www A    161.35.131.217
#   MX       Google Workspace 5-rec  (untouched)

set -euo pipefail

source /home/deploy/.secrets

DOMAIN="kevinwhite.us"
SLUG="kevin-white-us"
# CF Pages anycast IPs (fetched 2026-04-17 — re-fetch if stale)
IP1="172.66.44.206"
IP2="172.66.47.50"

echo "=== PRE-CHECK: production deploy must exist on main ==="
prod_title=$(curl -s "https://${SLUG}.pages.dev/" | grep -oE '<title>[^<]+</title>' | head -1)
echo "  ${SLUG}.pages.dev title: $prod_title"
echo

echo "=== Current DNS (before flip) ==="
dig +short A  "$DOMAIN"      @1.1.1.1
dig +short MX "$DOMAIN"      @1.1.1.1 | head -5

echo
read -p "Proceed with DNS flip? [y/N] " ok
[ "$ok" = "y" ] || { echo "Aborted."; exit 1; }

echo
echo "=== Updating apex A records ==="
curl -s -X PUT \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
  -H "Content-Type: application/json" \
  "https://api.godaddy.com/v1/domains/${DOMAIN}/records/A/@" \
  -d "[{\"data\":\"$IP1\",\"ttl\":600},{\"data\":\"$IP2\",\"ttl\":600}]"
echo

echo "=== Updating www CNAME ==="
curl -s -X PUT \
  -H "Authorization: sso-key $GODADDY_API_KEY:$GODADDY_API_SECRET" \
  -H "Content-Type: application/json" \
  "https://api.godaddy.com/v1/domains/${DOMAIN}/records/CNAME/www" \
  -d "[{\"data\":\"${SLUG}.pages.dev\",\"ttl\":600}]"
echo

echo "=== Verification (allow 5-10 min for propagation) ==="
for i in 1 2 3 4 5; do
  echo "Attempt $i:"
  dig +short A    "$DOMAIN"      @1.1.1.1
  dig +short CNAME "www.$DOMAIN" @1.1.1.1
  dig +short MX    "$DOMAIN"     @1.1.1.1 | head -1
  sleep 60
done

echo
echo "=== Final HTTPS check ==="
curl -sI "https://$DOMAIN/"        | head -3
curl -sI "https://www.$DOMAIN/"    | head -3

echo
echo "=== UptimeRobot monitor ==="
source /home/deploy/bin/.env 2>/dev/null || true
curl -s -X POST https://api.uptimerobot.com/v2/newMonitor \
  -d "api_key=${UPTIMEROBOT_API_KEY:-}&friendly_name=Kevin+White&url=https://${DOMAIN}&type=1&interval=300"

echo
echo "Done. Reminder: update dashboard.astro liveUrl for kevin-white-us."
