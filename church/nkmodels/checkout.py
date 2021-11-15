from django.db import connection


class CheckOutDb:
    def recordAmount(self, designation, update_debit, update_credit, update_balance, chachier_id):
        with connection.cursor()  as cursor:
           cursor.execute("""INSERT INTO church_checkout(designation, debit, credit, balance, church_id)
            VALUES(%s, %s, %s, %s, %s)""",(designation, update_debit, update_credit, update_balance, chachier_id))

    def checkBalance(self, cachier_id):
        with connection.cursor() as cursor:
            getamount = []
            cursor.execute(f"""SELECT balance FROM church_checkout WHERE church_id={cachier_id} 
            ORDER BY date, time DESC LIMIT 1 """)
            for final_amount in cursor.fetchall():
                for amount in final_amount:
                    getamount.append(amount)
            return getamount

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