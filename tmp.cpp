#include <iostream>
#include <string>
using namespace std;

char *complementary(char *s){
	int len = strlen(s);
	char cp[len] = new char [len];
	cout << len;
	return cp;
}

int main(void){
	char *s = "ATTAT";
	complementary(s);
	return 0;
}