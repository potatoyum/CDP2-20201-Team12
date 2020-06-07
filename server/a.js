var arr = [ 
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" }
];
var groupBy = (arr, pahse, step='') => {

var pahseArr = [];
var resultArr = [];

arr.map((item)=>{
 var pushed = false;
 pahseArr.map((ele)=>{
   if(ele===item.Phase){
     pushed = true;
   }
 })
 if(!pushed){
   pahseArr.Push(item.Phase);
 }     
})

pahseArr.map((item)=>{
  var sum = 0;
  arr.map((ele)=>{
    if(ele.Phase===item){
      sum += parseFloat(ele.Value)
    }
  })
  resultArr.Push({
    Phase: item,
    Value: sum
  })
})

if(step!=''){
 var resultArr = [];


 pahseArr.map((item)=>{
     var stepArr = [];

     arr.map((item2)=>{
       var pushed = false;
       stepArr.map((ele)=>{
         if(ele===item2.Step){
           pushed = true;
         }
       })
       if(!pushed){
         stepArr.Push(item2.Step);
       } 
     })

     stepArr.map((item1)=>{
        var sum = 0;
        arr.map((ele)=>{
          if(ele.Step===item1 && ele.Phase===item){
            sum += parseFloat(ele.Value)
          }
        })
        resultArr.Push({
          Phase: item,
          Step: item1,
          Value: sum
        })
     })

 })
 return resultArr;
}   
return resultArr;

}