import datetime

from church.nkmodels.financemodels import DisplayFinanceContent
from church.nkmodels.checkout import CheckOutDb

CURRENT_DATE = datetime.datetime.now()
NOW = CURRENT_DATE.strftime("%Y-%m-%d %H:%M:%S")

REQUEST_SOLDE = DisplayFinanceContent()

RECORD_AMOUNT = CheckOutDb()



class ComputeCredit:
	def __init__(self, balance):
		self.new_balance = balance

	def __sub__(self, amount):
		return ComputeCredit(self.new_balance - int(amount))

class ComputerDebit:
	def __init__(self, balance):
		self.new_balance = balance

	def __radd__(self, amount):
		return ComputerDebit(float(amount) + float(self.new_balance))

# CHECK OUT MANAGE

class ComputeCheckOut:
    alert  = {}
    @staticmethod
    def computeNewRecord(designation, cachier_id, new_debit=None, new_credit=None):
        if new_debit == None:
            debit_label = 0
            if len(RECORD_AMOUNT.checkBalance(cachier_id)) > 0:
                for balance in RECORD_AMOUNT.checkBalance(cachier_id):
                    asign_amount = ComputeCredit(balance)
                    calculate = asign_amount - new_credit
                    RECORD_AMOUNT.recordAmount(designation, debit_label,new_credit, calculate.new_balance, cachier_id)
            else:
                ComputeCheckOut.alert['msg'] = 'The account is empty!'
                return ComputeCheckOut.alert
                
        elif new_debit != None:
            credit_label = 0
            if len(RECORD_AMOUNT.checkBalance(cachier_id)) > 0:
                for balance in RECORD_AMOUNT.checkBalance(cachier_id):
                    asign_amount = ComputerDebit(balance)
                    calculate  = new_debit + asign_amount
                    RECORD_AMOUNT.recordAmount(designation, new_debit, credit_label, calculate.new_balance, cachier_id)
            else:
                RECORD_AMOUNT.recordAmount(designation, new_debit, credit_label, new_debit, cachier_id)
                
                

# GIVING & TITHE

class RecordPayment(ComputeCheckOut):
    def __init__(self, user_id, table_name, designation, amount):
        self.user_id = user_id
        self.amount = amount
        self.designation = designation
        self.table_name = table_name
        self.request_std_amount = REQUEST_SOLDE.queryBalance(self.user_id, self.table_name)
       
    def amountComputer(self):
        if len(self.request_std_amount) > 0:
            if self.request_std_amount[1] != NOW:
                asign_amount = ComputerDebit(self.request_std_amount[0])
                calcule = self.amount + asign_amount
                REQUEST_SOLDE.recordAmount(self.user_id, self.table_name, self.designation, self.amount, calcule.new_balance)
                ComputeCheckOut.computeNewRecord(self.designation, self.user_id, new_debit=self.amount)
                
        else:
            REQUEST_SOLDE.recordAmount(self.user_id, self.table_name, self.designation, self.amount, self.amount)
            ComputeCheckOut.computeNewRecord(self.designation, self.user_id, self.amount)
             

class RecordCredit(ComputeCheckOut):
    alert = {}
    def __init__(self, user_id, designation, amount):
        self.user_id = user_id
        self.designation = designation
        self.amount = amount 

    def checkBalance(self):
        for balance in RECORD_AMOUNT.checkBalance(self.user_id):
            if balance >= 0:
                ComputeCheckOut.computeNewRecord(designation=self.designation, cachier_id=self.user_id, new_credit=self.amount)
            else:
                RecordCredit.alert['msg'] = 'The balance is 0!'
                return RecordCredit.alert