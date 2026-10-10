"""Deployment status client used by the release checklist."""
import urllib.request

STATUS_URL = "https://status.internal.example/api/deploy"
TIMEOUT_S = 5  # status API p99 is ~4s under load


def deploy_status() -> bytes:
    with urllib.request.urlopen(STATUS_URL, timeout=TIMEOUT_S) as resp:
        return resp.read()
