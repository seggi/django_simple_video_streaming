import datetime
from django.db import connection


CURRENT_DATE = datetime.datetime.now()
NOW = CURRENT_DATE.strftime("%Y-%m-%d")


class DisplayFinanceContent:
    def displayCheckout(self, user_id, table_name):
        if table_name != None:
            with connection.cursor() as cursor:
                cursor.execute(f'SELECT * FROM {table_name} WHERE church_id= {user_id}')
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts
        else: 
            return ['Nonthing was selected!']


    def displayGiviging(self, user_id, table_name):
        if table_name != None:
            with connection.cursor() as cursor:
                cursor.execute(f'SELECT SUM(debit) sum FROM church_giving WHERE church_id = {user_id}')
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts
        else: 
            return ['Nonthing was selected!']

    def displayTithe(self, user_id, table_name):
        if table_name != None:
            with connection.cursor() as cursor:
                cursor.execute(f'SELECT SUM(debit) sum FROM church_tith WHERE church_id = {user_id}')
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts
        else: 
            return ['Nonthing was selected!']


    def searchData(self, user_id, table_name, date, date1):
        if table_name == 'church_giving':
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM church_giving WHERE date >= %s AND date <= %s AND church_id= %s", 
                                (date, date1, user_id))
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts

        elif table_name == "church_tith":
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM church_tith WHERE date >= %s AND date <= %s AND church_id= %s", 
                                (date, date1, user_id))
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts

        else:
            return ['Nonthing found!']

    @staticmethod
    def queryBalance(user_id, table_name):
        if table_name != None:
            with connection.cursor()  as cursor:
                amount = []
                cursor.execute(f"""SELECT balance, date FROM {table_name} WHERE church_id={user_id} 
                ORDER BY date, time DESC LIMIT 1 """)
                for balance in cursor.fetchall():
                    for final_amount in balance:
                        amount.append(final_amount)
                return amount
            

    def recordAmount(self, user_id, table_name, designation=None, amount=None, balance=None):
        if table_name == 'church_giving':
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO church_giving(designation, debit, balance, church_id) 
                    VALUES(%s, %s, %s, %s)""", (designation, amount, balance, user_id))
        
        elif table_name == 'church_tith':
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO church_tith(designation, debit, balance, church_id) 
                    VALUES(%s, %s, %s, %s)""", (designation, amount, balance, user_id))
            
    def deleteData(self, user_id, table_name, ids):
        if table_name != None:
            with connection.cursor()  as cursor:
                cursor.execute(f"""DELETE FROM {table_name} WHERE church_id={user_id} AND id={ids}""")
                if True:
                    cursor.execute(f"SELECT * FROM {table_name} WHERE church_id={user_id}")
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

    def editData(self, user_id, table_name, designation, amount, ids):
        if table_name == 'church_giving':
            with connection.cursor()  as cursor:
                cursor.execute("""UPDATE church_giving SET designation=%s, 
                        debit=%s WHERE church_id=%s AND id=%s """,(designation, amount, user_id, ids))
                if True:
                    cursor.execute(f"SELECT * FROM church_giving WHERE church_id={user_id}")
                    colnames = [desc[0] for desc in cursor.description]
                    rowdicts = []
                    for row in cursor.fetchall():
                        newdict = {}
                        for col, val in zip(colnames, row):
                            newdict[col] = val
                        rowdicts.append(newdict)
                    return rowdicts

        elif table_name == 'church_tith':
            with connection.cursor()  as cursor:
                cursor.execute("""UPDATE church_tith SET designation=%s,
                        debit=%s WHERE church_id=%s AND id=%s """,(designation, amount, user_id, ids))
                if True:
                    cursor.execute(f"SELECT * FROM church_tith WHERE church_id={user_id}")
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

    def deleteGet(self, user_id, table_name, ids):
        if table_name != None:
            with connection.cursor()  as cursor:
                cursor.execute(f"""SELECT id, designation, debit FROM {table_name} WHERE church_id={user_id} AND id={ids}""")
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return [rowdicts, {'table': table_name}]
        else:
            return []

        
class ChurchProgrom:
    def saveProgram (self, user_id, title, date,text_body, group):
        if group == 'appointment':
            group_default = True
            group_default1 = False
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO church_communication(date, title, body, appointment, program, church_id)
                    VALUES(%s, %s, %s, %s, %s, %s)""",(date, title, text_body, group_default,group_default1, user_id))
        
        elif group == 'program':
            group_default = True
            group_default1 = False
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO church_communication(date, title, body, appointment, program, church_id)
                    VALUES(%s, %s, %s, %s, %s, %s)""",(date, title, text_body, group_default1, group_default, user_id))

        

    def displayProgram(self, user_id, editData=None):
        if editData == None:
            with connection.cursor() as cursor:
                cursor.execute(f"""SELECT * FROM church_communication WHERE church_id={user_id}""")
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts

        else:
            with connection.cursor() as cursor:
                cursor.execute(f"""SELECT * FROM church_communication WHERE church_id={user_id} AND id={editData}""")
                colnames = [desc[0] for desc in cursor.description]
                rowdicts = []
                for row in cursor.fetchall():
                    newdict = {}
                    for col, val in zip(colnames, row):
                        newdict[col] = val
                    rowdicts.append(newdict)
                return rowdicts


    def updateProgram(self, user_id, title, date, body, program_id):
        with connection.cursor() as cursor:
            cursor.execute("""UPDATE church_communication SET title=%s, 
                        date=%s, body=%s WHERE church_id=%s AND id=%s """,(title, date, body,  user_id, program_id))


    def deleteProgram(self, user_id, program_id):
        with connection.cursor()  as cursor:
            cursor.execute(f"""DELETE FROM church_communication WHERE church_id={user_id} AND id={program_id}""")

    def searchProgram(self, user_id, date, date1):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM church_communication WHERE date >= %s AND date <= %s AND church_id= %s", 
                            (date, date1, user_id))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    @staticmethod
    def displayAppointment(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT COUNT(appointment) as appointment FROM church_communication 
                    WHERE appointment={1} AND church_id={user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts
    
    @staticmethod
    def displayChurchProgram(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT COUNT(id) as program FROM church_communication
                    WHERE program={1} AND church_id={user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    @staticmethod
    def displayChurchTill(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT COUNT(id) as till FROM church_checkout
                    WHERE church_id={user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts


    def poepleRendezVous(self):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT count(id) as people FROM church_believerregister""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def displayRendezVous(self):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT * FROM church_believerregister""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts


class PreachingFile:
    def saveFile(self, user_id, title, files):
        with connection.cursor() as cursor:
            cursor.execute("""INSERT INTO church_preachingvideo(title, files, church_id) 
                VALUES(%s, %s, %s)""",(title, files, user_id))

    @staticmethod
    def displayFiles(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT *  FROM church_preachingvideo WHERE church_id= {user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def deleteFile(self, user_id, file_id):
        with connection.cursor()  as cursor:
            cursor.execute(f"""DELETE FROM church_preachingvideo WHERE church_id={user_id} AND id={file_id}""")

    
    def searchFiles(self, user_id, date, date1):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_preachingvideo WHERE 
                                published_date >= %s AND published_date <= %s AND church_id= %s""", (date, date1, user_id))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    @staticmethod
    def displayChurchFile(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT COUNT(id) as files FROM church_preachingvideo WHERE church_id={user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    





class CheckoutManage:
    def displayReport(self, user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT *  FROM church_checkout WHERE church_id= {user_id}""")
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def searchReport(self, user_id, date, date1):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM church_checkout WHERE date >= %s AND date <= %s AND church_id= %s""", (date, date1, user_id))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    def searchReportSum(self, user_id, date, date1):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT (SUM(debit) - SUM(credit)) as datesum FROM church_checkout WHERE date >= %s AND date <= %s AND church_id= %s""", (date, date1, user_id))
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    @staticmethod
    def displaySummary(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT SUM(debit)as debit , SUM(credit)as credit, (SUM(debit) - SUM(credit))as balance 
                    FROM church_checkout WHERE church_id={user_id} AND date={NOW} """)
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts

    @staticmethod   
    def displayAllSummary(user_id):
        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT SUM(debit)as debit , SUM(credit)as credit, (SUM(debit) - SUM(credit))as balance 
                    FROM church_checkout WHERE church_id={user_id} """)
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for col, val in zip(colnames, row):
                    newdict[col] = val
                rowdicts.append(newdict)
            return rowdicts