# -*- coding: utf-8 -*-


def GetFileNameAndExt(filename):
	import os
	(filepath,tempfilename) = os.path.split(filename);
	(shotname,extension) = os.path.splitext(tempfilename);
	return shotname,extension