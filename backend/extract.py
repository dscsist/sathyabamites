import re

try:
    content = open('main.js', 'r', encoding='utf-8').read()
    # Find things like e.__BASE_URL+"MasterStudent/..."
    matches = re.findall(r'__BASE_URL\+"([^"]+)"', content)
    
    # Filter for student related
    student_endpoints = [m for m in matches if 'Student' in m or 'student' in m]
    print("Student Endpoints:")
    for ep in sorted(set(student_endpoints)):
        print(f"  {ep}")
        
    print("\nOther interesting endpoints:")
    other = [m for m in matches if 'Student' not in m and 'student' not in m and 'Master' not in m]
    for ep in sorted(set(other))[:20]: # print a few
        print(f"  {ep}")
except Exception as e:
    print(e)
