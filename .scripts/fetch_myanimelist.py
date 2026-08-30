import os
from pathlib import Path
import requests
from github import Github

CLIENT_ID = os.environ.get("MAL_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("MAL_CLIENT_SECRET", "")
REFRESH_TOKEN = os.environ.get("MAL_REFRESH_TOKEN", "")
GITHUB_TOKEN = os.environ.get("GH_PAT", "")
REPO_NAME = os.environ.get("GITHUB_REPOSITORY", "")


def refresh_access_token():
    url = "https://myanimelist.net/v1/oauth2/token"
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "refresh_token",
        "refresh_token": REFRESH_TOKEN,
    }

    r = requests.post(url, payload)
    r.raise_for_status()
    data = r.json()

    refresh_token = data["refresh_token"]
    access_token = data["access_token"]

    gh = Github(GITHUB_TOKEN)
    repo = gh.get_repo(REPO_NAME)
    repo.create_secret("MAL_REFRESH_TOKEN", refresh_token)

    return access_token


def fetch_anime_list(token: str) -> dict:
    url = "https://api.myanimelist.net/v2/users/@me/animelist"
    params: dict[str, str | int] = {
        "sort": "list_updated_at",
        "limit": 1,
        "fields": (
            "list_status{num_episodes_watched,status,updated_at},"
            "num_episodes,main_picture"
        )
    }
    headers = {"Authorization": f"Bearer {token}"}

    r = requests.get(url, headers=headers, params=params)
    r.raise_for_status()
    return r.json()["data"][0]


def write_update_data(data: dict) -> None:
    name = data["node"]["title"]
    eps_seen = data["list_status"]["num_episodes_watched"]
    eps_total = data["node"]["num_episodes"]
    image = data["node"]["main_picture"]["large"]
    url = f"https://myanimelist.net/anime/{data['node']['id']}"

    match data["list_status"]["status"]:
        case "watching":
            status = "Watching"
        case "completed":
            status = "Completed"
        case "on_hold":
            status = "On hold"
        case "dropped":
            status = "Dropped"
        case "plan_to_watch":
            status = "Plan to watch"

    macro_content = (
        f'export MYANIMELIST_NAME="{name}"\n'
        f'export MYANIMELIST_STATUS="{status}"\n'
        f'export MYANIMELIST_EPS_SEEN="{eps_seen}"\n'
        f'export MYANIMELIST_EPS_TOTAL="{eps_total}"\n'
        f'export MYANIMELIST_IMAGE="{image}"\n'
        f'export MYANIMELIST_URL="{url}"'
    )

    macro_file = Path(".kagami/myanimelist_macros")
    macro_file.write_text(macro_content)
    print(
        f"Anime data written to {macro_file.name}:\n"
        f"{macro_file.read_text()}"
    )


if __name__ == "__main__":
    try:
        token = refresh_access_token()
        last_update_data = fetch_anime_list(token)
        write_update_data(last_update_data)
    except Exception:
        placeholder = {
            "node": {
                "title": "",
                "num_episodes": "None",
                "main_picture": {"large": ""},
                "id": ""
            },
            "list_status": {
                "num_episodes_watched": "None",
                "status": "Error loading MAL data"
            }
        }
        write_update_data(placeholder)
