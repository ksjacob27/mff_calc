#include <iostream>
using namespace std;
#include <cmath>




int BAMgold(int rank, int amount){
int total = (amount / 50) * (125000);
int amount2 = amount /50 ;
int cost = 187500;
for(int i =3; i <= rank; i++)
    {
        total += amount2/2 * cost;
        amount2 = amount2/2;
        cost += 62500;
    }
return total;

}


int CCFgold(int rank, int amount)
{
    int total = (amount / 35) * (250000);
    int amount2 = amount /35 ;
    int cost = 375000;
    for(int i =3; i <= rank; i++)
        {
            total += amount2/2 * cost;
            amount2 = amount2/2;
            cost += 125000;
        }
    return total;
}


void BAM(){
int rank=0; 
int amount = 0;

cout << "Enter the rank of BAM: " << endl; cin >> rank;

cout << "Enter the amount: " << endl; cin >> amount;
int total = 0;
int amount2 = 0;
amount2 = amount * pow(2, rank-2);
total = amount2 *50;
int x = BAMgold(rank, total);
cout << "Total BAM: " << total << endl;
cout << "Total cost: " << x << endl;
}


void CCF()
{
    int rank=0; 
    int amount = 0;

    cout << "Enter the rank of CCF: " << endl; cin >> rank;

    cout << "Enter the amount: " << endl; cin >> amount;
    int total = 0;


    int amount2 = 0;


    amount2 = amount * pow(2, rank-2);
    total = amount2 *35;
    int x = CCFgold(rank, total);
    cout << "Total CCF: " << total << endl;
    cout << "Total cost: " << x << endl;
}







int main(){
int input;
cout << "1. BAM \n2. CCF" << endl; cin >> input;

if(input==1)
    {
        BAM();
    }
else CCF();
}


