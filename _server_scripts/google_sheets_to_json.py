from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import pandas as pd
import os
import json



with open('_data/google_sheets.json', 'r') as f:
    pullLst = json.load(f)

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    scopes = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/spreadsheets.readonly']
    key_id = os.environ['google_service_private_key_id']
    key = os.environ['google_service_private_key']
    
    cred_info = {"type": "service_account",
                 "project_id": "dw-website-updates",
                 "private_key_id": key_id,
                 "private_key": key,
                 "client_email": "artificial-artificer-website@dw-website-updates.iam.gserviceaccount.com",
                 "client_id": "110303972029671992358",
                 "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                 "token_uri": "https://oauth2.googleapis.com/token",
                 "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                 "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/artificial-artificer-website%40dw-website-updates.iam.gserviceaccount.com"
    }

    credentials = service_account.Credentials.from_service_account_info(info=cred_info, scopes=scopes)

    service = build('sheets', 'v4', credentials=credentials)
    # Call the Sheets API
    for p in pullLst["sheets"]:
        try:
				
            print(p)
            SAMPLE_SPREADSHEET_ID = p["sheetId"]

            dest = p["dest"]

            print (f"working on {dest}")
            sheet = service.spreadsheets()

            if "sheet" in p.keys():
              SAMPLE_RANGE_NAME = p["sheet"]            
              result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                      range=SAMPLE_RANGE_NAME).execute()
              values = result.get('values', [])
              if values:

                  max_col = len(values[0])
                  #all rows need to be the same length, Google Sheets API doesn't return cells without values
                  corrected_values = [x + [''] * (max_col - len(x))for x in values]
                  #liquid works better with lower case letters and no spaces in the fieldnames
                  header_row = [x.lower().replace(' ','-').replace('/','-') for x in corrected_values[0]]
                  df = pd.DataFrame(corrected_values[1:], columns=header_row).fillna('')
                  df.to_json(dest, orient="records")
            elif "data" in p.keys() and "meta" in p.keys():
              print(p)
              SAMPLE_RANGE_NAME = p["data"]

              print (f"working on {dest}")
              sheet = service.spreadsheets()
              result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=SAMPLE_RANGE_NAME).execute()
              values = result.get('values', [])
              data = None
              if values:
                  max_col = len(values[0])
                  #all rows need to be the same length, Google Sheets API doesn't return cells without values
                  corrected_values = [x + [''] * (max_col - len(x))for x in values]
                  #liquid works better with lower case letters and no spaces in the fieldnames
                  header_row = [x.lower().replace(' ','-').replace('/','-') for x in corrected_values[0]]
                  df = pd.DataFrame(corrected_values[1:], columns=header_row).fillna('')
                  data={"data":df.to_dict(orient="records")}

              SAMPLE_RANGE_NAME = p["meta"]

              print (f"working on {SAMPLE_RANGE_NAME}")
              sheet = service.spreadsheets()
              result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=SAMPLE_RANGE_NAME).execute()

              values = result.get('values', [])
              metadata={} 
              if values:
                  max_col = len(values[0])
                  #all rows need to be the same length, Google Sheets API doesn't return cells without values
                  corrected_values = [x + [''] * (max_col - len(x))for x in values]
                  for key,value in corrected_values:
                      metadata[key]=value	
                  data["metadata"]=metadata
                  
              with open(dest, 'w', encoding='utf-8') as f:
                  json.dump(data, f, ensure_ascii=False, indent=4)    
        except HttpError as err:
            print(err)




