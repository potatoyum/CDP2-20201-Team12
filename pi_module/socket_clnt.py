import socketio
import sys
from os.path import exists
import threading

sio = socketio.Client()

sio.connect('http://18.206.164.250:9001')


filename = 'result.txt'
filepath =  '/home/pi/'+filename

i=0

 
def connaaa():

 

    print('connection established')

    #asap connect success

    sio.emit('reqMsg', {'message':'im camera 1'})

    #set_interval(sendfile,3)

 


connaaa()

 

def sendfile():

 
    with open(filepath,'r') as f:

        try:

            while True:

                line = f.readline()

                if not line: break

                print(line)

                line=line.strip('\n')

                split_line=line.split(' ')   

                sio.emit('sendValue', {'camera_id':'1', 'date':'200607', 'hour':split_line[0], 'counting':split_line[3]})

            f.close()

        except Exception as e:
            print(e)


sendfile()

 

#@sio.event

#def serverConnect(data):

#@sio.event


def disconnect():

    print('disconnected from server')

 


def set_interval(func,sec):


    def func_wrapper():

        set_interval(func,sec)

 

        func()

 

    t = threading.Timer(sec,func_wrapper)

 

    t.start()

 

    return t

 

 

 

 

 

sio.wait() 
