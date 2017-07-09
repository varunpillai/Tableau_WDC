import urllib2

url='http://beringmedia.helpserve.com/api/index.php?e=/Tickets/Ticket/ListAll/12,17,18,19,20,21,23,24,25,29,30/4,5,6,7,8,9/&apikey=c9d160ae-0802-d194-5990-7ff6fb07889f&salt=75996179&signature=f2YHCCJYVzLdGrd9MjPA0CvmHEPyXwAcmkjXk6Sldhs%3D'

req = urllib2.Request(url)
res = urllib2.urlopen(req)
print(res.read())