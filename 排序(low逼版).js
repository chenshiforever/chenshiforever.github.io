 function getRandom(){
        var baseNum=[]; 
        for(var i= 0;i< 1000 ;i++){ 
            random = Math.floor(Math.random()*i); 
            baseNum.push(random); 
        }
        return baseNum;
      }
      function unique(arr) {
          var result = [], hash = {};
          for (var i = 0, elem; (elem = arr[i]) != null; i++) {
              if (!hash[elem]) {
                  result.push(elem);
                  hash[elem] = 1;
              } else {
                hash[elem]++;
              }
          }
          return hash;
      }
      function sortTo(obj) {
         var hash = {};
          for (var i in obj) {
              if (!hash[obj[i]]) {
                  hash[obj[i]]=[];
                 hash[obj[i]][i] = i; 
              }else{
                hash[obj[i]][i] = i;
              }
          }
          return hash;
      }
      var num = getRandom();
      var uniqueNum = unique(num);
      var log = sortTo(uniqueNum);
      console.log(log);