import traceback
import sys
import hashlib
import logging
from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction
from sawtooth_sdk.processor.exceptions import InternalError
from sawtooth_sdk.processor.core import TransactionProcessor

LOGGER = logging.getLogger(__name__)
DEFAULT_URL = 'tcp://validator:4004'
FAMILY_NAME = 'voting'
def _hash(data):
    return hashlib.sha512(data).hexdigest()

class VotingTransactionHandler(TransactionHandler):  
    def __init__(self, namespace_prefix):
        '''initialization'''
        self._namespace_prefix = namespace_prefix  

    @property
    def family_name(self):
        '''Return Transaction Family name string.'''
        return FAMILY_NAME
    @property
    def family_versions(self):
        '''Return Transaction Family version string.'''
        return ['1.0']

    @property
    def namespaces(self):
        '''Return Transaction Family namespace 6-character prefix.'''
        return [self._namespace_prefix]

    def apply(self, transaction, context):
        '''This implements the apply function for the TransactionHandler class.
           The apply function does most of the work for this class by
           processing a transaction for the transaction family.
        '''
        header = transaction.header
        payload_list = transaction.payload.decode().split(",")
        action = payload_list[0]
        addrs = header.inputs[0]        
        if action=="create":
              self._create_party(context, addrs)   
        elif action=="vote":
            LOGGER.info(header.inputs)
            self._make_vote(context,header.inputs[0],header.inputs[1])     
        elif action == "start_election":
            self._start_election(context, addrs)
        elif action == "stop_election":
            self._stop_election(context, addrs)
        else:
            LOGGER.info("Unhandled action. Action should be add or vote or list")

    @classmethod
    def _update_party(cls, context,  addrs,timeout=5):
        LOGGER.info('Updating party info')
        state_entries=context.get_state([addrs])  
        if state_entries == []:
            raise InvalidTransaction('Party non existing')
            return False
        else:
            try:
                count = int(state_entries[0].data)
            except:
                raise InternalError('Failed to load state data')
                return
            new_count = 1 + int(count)

        state_data = str(new_count).encode('utf-8')
        addresses = context.set_state({addrs: state_data})

    @classmethod
    def _update_voter(cls, context,  addrs,timeout=5):
        LOGGER.info('Updating voter info')
        state_entries=context.get_state([addrs])  
        if state_entries == []:
            raise InvalidTransaction('Voter non existing')
            return False
        else:
            try:
                flag = int(state_entries[0].data)
                LOGGER.info("flag found..............")
            except:
                raise InternalError('Failed to load state data')
                return
        
        if int(flag) == 0:
            flag = 1
            state_data = str("1").encode('utf-8')
            addresses = context.set_state({addrs: state_data})
            return True
        else:
            LOGGER.info("Voter has already voted")
            return False

    @classmethod
    def _start_election(cls, context,  addrs,timeout=5):
        LOGGER.info('Updating election info')
        state_entries=context.get_state([addrs])  
        if state_entries == []:
            raise InvalidTransaction('Election non existing')
            return False
        else:
            try:
                flag = int(state_entries[0].data)
                LOGGER.info("flag found..............")
            except:
                raise InternalError('Failed to load state data')
                return
        
        if int(flag) == 0:
            flag = 1
            state_data = str("1").encode('utf-8')
            addresses = context.set_state({addrs: state_data})
            return True
        else:
            LOGGER.info("Election is already over")
            return False

    @classmethod
    def _stop_election(cls, context,  addrs,timeout=5):
        LOGGER.info('Updating election info')
        state_entries=context.get_state([addrs])  
        if state_entries == []:
            raise InvalidTransaction('Election non existing')
            return False
        else:
            try:
                flag = int(state_entries[0].data)
                LOGGER.info("flag found..............")
            except:
                raise InternalError('Failed to load state data')
                return
        
        if int(flag) == 1:
            flag = 2
            state_data = str("2").encode('utf-8')
            addresses = context.set_state({addrs: state_data})
            return True
        else:
            LOGGER.info("Election is not started")
            return False

    @classmethod
    def _make_vote(cls, context, addrs,uaddrs,timeout=5):   
            LOGGER.info('Creating a vote')
            if VotingTransactionHandler._update_voter(context, uaddrs):
                LOGGER.info("Voting in tp")
                VotingTransactionHandler._update_party(context, addrs)
            else:
                LOGGER.info("Exception in tp...............")
                raise InvalidTransaction("User Already Voted@@@@@@@@@@@@@@@@@@@@@@@@@@2")    

    @classmethod
    def _update_user(cls, context, addrs,timeout=5):
        state_entries=context.get_state([addrs])  
        if state_entries == []:
            LOGGER.info('Registering vote for new user %s',addrs)
            new_count=1
            state_data = str(new_count).encode('utf-8')
            addresses = context.set_state({addrs: state_data})
            return True
        else:
               return False 
        

    @classmethod
    def _create_party(cls, context, addrs,timeout=5):
        state_entries=context.get_state([addrs])  
        if state_entries == []:
             LOGGER.info('Registering new party %s',addrs)
             state_data = str(0).encode('utf-8')
             addresses = context.set_state({addrs: state_data})
        else:
            raise InvalidTransaction("Party already exists")    

def main():
    '''Entry-point function for the Transaction Processor.'''
    try:
        # Setup logging for this class.
        logging.basicConfig()
        logging.getLogger().setLevel(logging.DEBUG)

        # Register the Transaction Handler and start it.
        processor = TransactionProcessor(url=DEFAULT_URL)
        sw_namespace = _hash(FAMILY_NAME.encode('utf-8'))[0:6]
        handler = VotingTransactionHandler(sw_namespace)
        processor.add_handler(handler)
        processor.start()
    except KeyboardInterrupt:
        pass
    except SystemExit as err:
        raise err
    except BaseException as err:
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
