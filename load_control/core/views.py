from django.shortcuts import render
from rest_framework.parsers import FileUploadParser


from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView



def home(request):
    return render(request, 'index.html')


class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, filename, format=None):
        file_obj = request.data['file']

        return Response(status=204)