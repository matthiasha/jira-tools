#!/Users/mzhafn/.pyenv/versions/venv/bin/python

import sys
import os
import getpass
from jira import JIRA
from jira.resources import GreenHopperResource
import argparse

j = JIRA(
    "https://jira.dolby.net/jira",
    auth=(getpass.getuser(), os.environ["AD_PASSWORD"]),
    options={"agile_rest_path": GreenHopperResource.AGILE_BASE_REST_PATH},
)

parser = argparse.ArgumentParser(
    description="Set Jira field",
    formatter_class=argparse.ArgumentDefaultsHelpFormatter,
)
parser.add_argument(
    "issue", help="Jira issue"
)
parser.add_argument(
    "name", help="Field name"
)
parser.add_argument(
    "value", help="Field value"
)
args = parser.parse_args()


# print('\n'.join(f'{f["id"]}: {f["name"]}' for f in j.fields()))
aliases = {"estimate": "customfield_10262"}
name = aliases.get(args.name, args.name)

try:
    value = float(args.value)
except ValueError:
    value = args.value

issue = j.issue(args.issue)
print(f"{args.issue}: {issue.fields.summary}")
print(f"{name} = {getattr(issue.fields, name)}", end="")
issue.update({name: value})
print(f" => {getattr(issue.fields, name)}")


