#define _CRT_SECURE_NO_WARNINGS 
#include <stdio.h>
#include <stdlib.h>
#include <WinSock2.h>

#define BUF_SIZE 30

int Floating() {
	FILE * fp;
	int count[2];
	int result = 0;
	int hour, min, sec;

	count[1] = 0;
	fp = fopen("count_result.txt", "r");

	while (fscanf(fp, "%d %d %d %d", &hour, &min, &sec, &count[0]) != -1) {
		if (count[0] > count[1]) {
			result += count[0] - count[1];
		}
		count[1] = count[0];
	}
	fclose(fp);
	return result;
}

void ErrorHandling(char*message) {
	fputs(message, stderr);
	fputc('\n', stderr);
	exit(1);
}

int main(void) {
	WSADATA wsaData;
	SOCKET hServSock, hClntSock;
	SOCKADDR_IN servAddr, clntAddr;
	FILE * fp;

	int szClntAddr;
	char buf[BUF_SIZE];
	int readCnt;

	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
		ErrorHandling("WSAStartup() error!");

	fp = fopen("count_result.txt", "wb");
	hServSock = socket(PF_INET, SOCK_STREAM, 0);

	if (hServSock == INVALID_SOCKET)
		ErrorHandling("socket() error");

	memset(&servAddr, 0, sizeof(servAddr));
	servAddr.sin_family = AF_INET;
	servAddr.sin_addr.s_addr = htonl(INADDR_ANY);
	servAddr.sin_port = htons(atoi("9190"));

	if (bind(hServSock, (SOCKADDR*)&servAddr, sizeof(servAddr)) == SOCKET_ERROR)
		ErrorHandling("bind() error");

	if (listen(hServSock, 5) == SOCKET_ERROR)
		ErrorHandling("listen() error");
	
	szClntAddr = sizeof(clntAddr);
	hClntSock = accept(hServSock, (SOCKADDR*)&clntAddr, &szClntAddr);
	if (hClntSock == INVALID_SOCKET)
		ErrorHandling("accept() error");
	while (1) {
		while ((readCnt = recv(hClntSock, buf, BUF_SIZE, 0)) != 0) {
			fwrite((void*)buf, 1, readCnt, fp);
		}
		fclose(fp);
		closesocket(hClntSock);
		printf("%d\n", Floating());
		fp = fopen("count_result.txt", "wb");
		hClntSock = accept(hServSock, (SOCKADDR*)&clntAddr, &szClntAddr);
	}
	fclose(fp);
	closesocket(hServSock);
	closesocket(hClntSock);
	WSACleanup();

	printf("%d\n", Floating());

	return 0;
}