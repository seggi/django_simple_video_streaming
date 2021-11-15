from django.db import connection 


class PublicData:
    def churchProgram(self):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM church_visitschedule")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def postPreaching(self):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM church_preachingvideo")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def postPreachingWide(self, video_id):
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM church_preachingvideo WHERE id={video_id}")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def searchPreaching(self, searchdate):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_preachingvideo WHERE published_date=%s""",(searchdate, ))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts


    def postedNews(self, user_id):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_postnews WHERE church_id=%s""",(user_id, ))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts  
            

    def deleteBlogPost(self, user_id, delete_blog):
        with connection.cursor() as cursor:
            cursor.execute(f"""DELETE FROM church_postnews WHERE church_id={user_id} AND id={delete_blog}""")
            

    def postedEvents(self, user_id):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_postevents WHERE church_id=%s""",(user_id, ))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts  
            

    def deleteBlogPostEvents(self, user_id, delete_blog):
        with connection.cursor() as cursor:
            cursor.execute("""DELETE FROM church_postevents WHERE church_id=%s AND id=%s""", (user_id, delete_blog))
            

    def visitProgramShow(self, user_id):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_visitschedule WHERE church_id=%s""",(user_id, ))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts  

    def deleteVisit(self, user_id, delete_visit):
        with connection.cursor() as cursor:
            cursor.execute("""DELETE FROM church_visitschedule WHERE church_id=%s AND id=%s""", (user_id, delete_visit))
            

    def getArticle(self, post_info):
        with connection.cursor() as cursor:
            cursor.execute("""INSERT INTO church_blogpost(commun) VALUES(%s)""",(post_info,))

    def postArticle(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_blogpost""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts 
    
    def postPublicArticle(self):
        pass

    def displayProgram(self, option):
        if option == '0':
            with connection.cursor() as cursor:
                cursor.execute(f"""SELECT * FROM church_communication WHERE appointment = {0}""")
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts 
        elif option == '1':
            with connection.cursor() as cursor:
                cursor.execute(f"""SELECT * FROM church_communication WHERE program = {1}""")
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts 
        else:
            return []

    def displayCommuns(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT church_communication.date, church_communication.title,
            church_communication.body FROM church_blogpost LEFT JOIN church_communication ON
            church_communication.id = church_blogpost.commun""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts 

    def getCurrentPost(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT church_communication.id, church_communication.date, church_communication.title,
            church_communication.body FROM church_blogpost LEFT JOIN church_communication ON
            church_communication.id = church_blogpost.commun""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts 

    def removeCurrentPost(self, commun):
        with connection.cursor() as cursor:
            cursor.execute("""DELETE FROM church_blogpost WHERE commun=%s""", (commun, ))
           

    
    
    