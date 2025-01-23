API DOCUMENTATION

---

ExpressJs framework used
database used is AtlasMongodb

server port-7001

example route: for localhost - http://localhost:7001

env varilables

---

SECRET_KEY=jse234Adswjsfj
MONGOURL=mongodb+srv://lalkirshna00:lalkrishna00@cluster0.1m34c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Admin Routes (/admin)

---

example-http://localhost:7001/admin/login

admin credentials as per mentioned the note is static now.

email - admin@admin.com , password - admin

1. /login - only for admin login
2. /add-student - add students from admin side,password encryption added
3. /assign-task - for assign tasks from admin side to student

Student Routes (/student)

---

example-http://localhost:7001/student/login

1. /login - for student login
2. /studentId/tasks - student can fetch all the task that assigned from admin side
3. /task/:taskId - for updating the task status

NOTE

---

plese refer the file admin-student-panel.postman_collection.json for how to use api body and method details from the postman succesfully tested and exported page.

status code

---

200-successfull
401-unauthorized
500-server error
