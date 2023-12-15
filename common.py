import os
import pandas
from jira import JIRA
from jira.resources import AgileResource

TOKEN = os.environ["JIRA_API_TOKEN"]

jira = JIRA(
    "https://jira.dolby.net/jira",
    options={
        "agile_rest_path": AgileResource.AGILE_BASE_REST_PATH,
        "headers": {
            "Authorization": f"Bearer {TOKEN}",
            **JIRA.DEFAULT_OPTIONS["headers"],
        },
    },
)
pandas.set_option("display.width", None)
pandas.set_option("display.max_colwidth", None)
pandas.set_option('display.max_rows', None)

# print('\n'.join(f'{f["id"]}: {f["name"]}' for f in j.fields()))
jira_names = {"estimate": "customfield_10262",
              "epic": "customfield_10921"}