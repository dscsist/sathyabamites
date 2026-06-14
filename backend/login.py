import requests
import json

def fetch_student_details(register_number, password):
    login_url = "https://erp.sathyabama.ac.in/erp/api/v1.0/MasterStudent/login"
    payload = {
        "RegisterNumber": register_number,
        "Password": password
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    print(f"Logging in to {login_url}...")
    try:
        response = requests.post(login_url, json=payload, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status"):
                print("[SUCCESS] Login Successful!")
                
                login_data = data.get("responseData", {}).get("login", {})
                token = login_data.get("accessToken", "")
                student_id = login_data.get("StudentId", "")
                
                if not token or not student_id:
                    print("[FAILED] Could not retrieve access token or Student ID.")
                    return
                
                # Now fetch full profile details
                profile_url = "https://erp.sathyabama.ac.in/erp/api/v1.0/MasterStudent/getstudentbystudentid"
                profile_headers = {
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                profile_payload = {"StudentId": student_id}
                
                print(f"\nFetching full profile details from {profile_url}...")
                profile_resp = requests.post(profile_url, headers=profile_headers, json=profile_payload, timeout=10)
                
                if profile_resp.status_code == 200:
                    profile_data = profile_resp.json()
                    if profile_data.get("status") and profile_data.get("responseData"):
                        student_info = profile_data["responseData"][0]
                        print("\n" + "="*50)
                        print(" "*15 + "STUDENT PROFILE")
                        print("="*50)
                        
                        # Basic Info
                        print(f"Name           : {student_info.get('StudentName')}")
                        print(f"Reg No         : {student_info.get('RegisterNumber')}")
                        print(f"DOB            : {student_info.get('DOB', '').split('T')[0]}")
                        print(f"Email          : {student_info.get('Email')}")
                        print(f"Mobile         : {student_info.get('MobileNumber')}")
                        print(f"Aadhar No      : {student_info.get('StudentAadharNo')}")
                        print(f"APAAR Id       : {student_info.get('APAARId')}")
                        
                        # Academic Info
                        print("\n--- Academic Details ---")
                        print(f"Programme      : {student_info.get('ProgrammeName')}")
                        print(f"Course         : {student_info.get('CourseFullForm')} ({student_info.get('CourseName')})")
                        print(f"School         : {student_info.get('SchoolName')}")
                        print(f"Batch          : {student_info.get('Batch')}")
                        print(f"Year of Study  : {student_info.get('YearofStudy')}")
                        print(f"Semester       : {student_info.get('Semester')}")
                        print(f"Section        : {student_info.get('SectionName')}")
                        print(f"Current Acd Yr : {student_info.get('CurrentAcademicYear')}")
                        print(f"Hostel Reqd    : {'Yes' if student_info.get('IsHostelRequired') else 'No'}")
                        
                        # Parent Info
                        print("\n--- Parent Details ---")
                        print(f"Father Name    : {student_info.get('FatherName')}")
                        print(f"Father Mobile  : {student_info.get('FatherMobileNo')}")
                        print(f"Mother Name    : {student_info.get('MotherName')}")
                        print(f"Mother Mobile  : {student_info.get('MotherMobileNo')}")
                        print(f"Parents Email  : {student_info.get('ParentsEmailId')}")
                        
                        # Links / Photos
                        print("\n--- Documents & Photos ---")
                        print(f"Profile Photo  : {student_info.get('Photo')}")
                        print(f"Father Photo   : {student_info.get('FatherPhoto')}")
                        print(f"Mother Photo   : {student_info.get('MotherPhoto')}")
                        print(f"10th Cert      : {student_info.get('TenthCertificatePhoto')}")
                        print(f"12th Cert      : {student_info.get('TwelveCertificatePhoto')}")
                        print(f"TC PDF         : {student_info.get('studentTC')}")
                        print("="*50)
                        
                        return student_info
                    else:
                        print("[FAILED] Could not retrieve profile data.")
                else:
                    print(f"[ERROR] Failed to fetch profile. Status: {profile_resp.status_code}")
                
            else:
                print("[FAILED] Login Failed!")
                print(f"Message: {data.get('message')}")
        else:
            print(f"[ERROR] Server Error: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"[ERROR] Connection Error: {e}")

if __name__ == "__main__":
    # Test credentials provided by user
    REG_NO = "43110***"
    PASSWORD = "***"
    
    fetch_student_details(REG_NO, PASSWORD)
