#include "dnd_character.h"

dnd_character_t ret;
int ability(void)
{
    int sum=-1;
    srand(time(NULL));
    
        
            int a = (rand() % 6) + 1;  
            int b = (rand() % 6) + 1;  
            int c = (rand() % 6) + 1;  
            int d = (rand() % 6) + 1; 
            if ((a>0) && (b>0) && (c>0) && (d>0))
            {
                char arr[4];
                arr[0]=a;arr[1]=b;arr[2]=c;arr[3]=d;
                /*if((a>b) && (c>b) && (d> b))
                {
                    sum = a+c+d;
                }
                else if ((b>a) && (c>a) && (d>a))
                {
                    sum = b+c+d;
                }
                else if ((a>c) && (b>c) && (d>c))
                {
                    sum =a+b+d;
                }
                else if ((a>d)&&(b>d)&&(c>d))
                {
                    sum = a+b+c;
                }*/
                int min=6,ind=0;
                for(int i=0;i<4;i++)
                {
                   if(arr[i]<min){
                       min=arr[i];
                       ind=i;
                   } 
                }

                for(int i=0;i<4;i++)
                {
                    if(i!=ind)
                    {
                        sum+=arr[i];
                    }
                }


                
               
             
        
    }
   return sum;
}
int modifier(int score)
{
    score=(score/2)-5;
    return score;
}

dnd_character_t make_dnd_character(void)
{
    ret.strength=ability();
    ret.dexterity=ability();
    ret.constitution=ability();
    ret.intelligence=ability();
    ret.wisdom=ability();
    ret.charisma=ability();
    ret.hitpoints=10+modifier(ret.constitution);
    
    return ret;
}