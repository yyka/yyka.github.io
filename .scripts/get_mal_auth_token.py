import json
import os
import requests
import secrets

CLIENT_ID = os.environ.get("CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET", "")


def get_code_challenge() -> str:
    token = secrets.token_urlsafe(100)
    return token[:128]


def print_auth_url(code_challenge: str) -> None:
    method = "GET"
    url = "https://myanimelist.net/v1/oauth2/authorize"
    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "code_challenge": code_challenge
    }

    r = requests.Request(method=method, url=url, params=params)
    print(f"Auth link: {r.prepare().url}\n")


def get_auth_token(auth_code:  str, code_verifier: str) -> dict:
    url = "https://myanimelist.net/v1/oauth2/token"
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": auth_code,
        "code_verifier": code_verifier,
        "grant_type": "authorization_code"
    }

    r = requests.post(url, data)
    r.raise_for_status()

    token = r.json()
    with open('token.json', 'w') as file:
        json.dump(token, file, indent=4)
        print('Token saved in "token.json"')

    return token


def get_user_name(token: str) -> str:
    url = "https://api.myanimelist.net/v2/users/@me"
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    return r.json()['name']


if __name__ == "__main__":
    code_verifier = get_code_challenge()
    print_auth_url(code_verifier)

    auth_code = input("Auth code: ")
    token = get_auth_token(auth_code, code_verifier)['access_token']

    print(f"Successfully acquired token for user '{get_user_name(token)}")
