import requests
import json

def get_token(register_number, password):
    url = "https://erp.sathyabama.ac.in/erp/api/v1.0/MasterStudent/login"
    payload = {"RegisterNumber": register_number, "Password": password}
    response = requests.post(url, json=payload, headers={
        "Origin": "https://erp.sathyabama.ac.in",
        "Referer": "https://erp.sathyabama.ac.in/",
        "User-Agent": "Mozilla/5.0"
    })
    if response.status_code == 200:
        data = response.json()
        login_data = data.get("responseData", {}).get("login", {})
        return login_data.get("accessToken", ""), login_data.get("StudentId", ""), register_number
    return "", "", ""

def test_endpoint(endpoint, token, student_id, register_number):
    url = f"https://erp.sathyabama.ac.in/erp/api/v1.0/{endpoint}"
    headers = {
        "Authorization": f"Bearer {token}", 
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://erp.sathyabama.ac.in",
        "Referer": "https://erp.sathyabama.ac.in/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    print(f"\n--- Testing POST {endpoint} ---")
    
    payloads = [
        {"StudentId": student_id},
        {"RegisterNumber": register_number},
        {"StudentId": student_id, "RegisterNumber": register_number},
        {} # empty
    ]
    
    for i, payload in enumerate(payloads):
        try:
            r_post = requests.post(url, headers=headers, json=payload)
            print(f"Payload {i+1} Status:", r_post.status_code)
            if r_post.status_code == 200:
                print("Response Snippet:", str(r_post.text)[:500])
                break
        except Exception as e:
            print(f"POST Error:", e)

if __name__ == "__main__":
    token, student_id, register_number = get_token("43110443", "S-Khavin@2006W")
    if token:
        print("Got token successfully.")
        endpoints = [
            "MasterStudent/StudentDashBoard",
            "ResultMark/studentResult",
            "Notifications/student",
            "StudentDailyAttendance/Overallreport",
            "MarksheetStudent/list"
        ]
        for ep in endpoints:
            test_endpoint(ep, token, student_id, register_number)
    else:
        print("Failed to get token")
