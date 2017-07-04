
import web

urls = (
	'/','index'
	)

class index:
	def GET(self):
		print 1111
		return '11111'

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()


 111111111