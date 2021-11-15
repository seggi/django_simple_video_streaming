from django.db import connection 

class LocationData:
    def countries(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT id, name as country FROM nk_country """ )
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for name, country in zip(colnames, row):
                    newdict[name] = country
                rowdicts.append(newdict)
            return rowdicts

    
    def states(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT id, name as state, country_id as countries FROM nk_state """)
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for name, state in zip(colnames, row):
                    newdict[name] = state
                rowdicts.append(newdict)
            return rowdicts

    def cities(self):
        with connection.cursor() as cursor:
            cursor.execute("""SELECT id, name as city, state_id as states FROM nk_city """)
            colnames = [desc[0] for desc in cursor.description]
            rowdicts = []
            for row in cursor.fetchall():
                newdict = {}
                for name, city in zip(colnames, row):
                    newdict[name] = city
                rowdicts.append(newdict)
            return rowdicts