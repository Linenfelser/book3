function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the desensity of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  
  var samples = _.flatten(_.pluck(items, 'Samples'))
  
  var unique = _.uniq(_.filter(samples, function(d){
    return d>0
  }))
  // console.log('unique:', unique)
  return 'There are ' + unique.length + ' unique numbers: ' + unique
}

function func2(){
  // console.log('ITEMS:', items)
  // var first = 0
  // var second = 0
  // var compare = _.forEach(_.map(items, function(d){
  //   return{
  //     'time' : d['Ping_time'],
  //     'timeParse' :  parseInt(d['Ping_time'].split(":")[2])
  //   }
  // }))

  // var average = 0
  // for(k=0, k<compare.length; k++){
  //   first = compare[k]
  //   second = compare[k+1]
  //   average = (second['timeParse'] + first['timeParse'])
  //   console.log('second', second['timeParse'])
  // }
    
  // console.log('second', second['timeParse'])
  // console.log('first:', first['timeParse'])
  // console.log(compare)
  // average = average/compare.length
  // console.log('average:',average)
  // return average
}

function func3(){
  var time = _.find(items, function(d){
    return d.Ping_time == '09:57:18'
  })
  //console.log('TIME:', time)
  var s = _.filter(time, function(d){
    return d.Samples == '7.000000'
  })
  return s.length
}

function func4(){
  var group = _.groupBy(items, "Ping_time")
  var map = _.mapValues(group, function(d){
    return _.filter(d[0].Samples, function(f){ 
      return f == 3
    }).length
  })

  var pairs = _.pairs(map)
  var sort = _.sortBy(pairs, function(d){
    return d[1]
  })

  var sorts = sort[sort.length-1][0]
  return 'the measurement at ' + sorts
}

function func5(){
  var sample = _.filter(items, function(d){
    return _.every(d.Samples, function(f){
      return f<= 0.000000
    })
  })
  return sample.length
}

function func6(){
  var sample = _.flatten(_.pluck(items, 'Samples'))
  //console.log('sample:', sample)
  var greater = _.filter(sample, function(d){
    return d > 0
  })
  
  var group = _.groupBy(greater)
  var most = _.max(group, function(d){
    return d.length
  })
  return most[0]
} 

function func7(){

  // this sample code shows how to display a map and put a marker to visualize
  // the location of the first item (i.e., measurement data)
  // you need to adapt this code to answer the question

  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

  var circle = L.circle(pos, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);
  return '...'
}

function func8(){

  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 9)

  //var polyline = L.polyline([]).addTo(map)

  _.forEach(items, function(d){
    pos = [d.Latitude, d.Longitude]
    var circle = L.circle(pos, 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
    }).addTo(map);
  })
  return '...'
}

function func9(){

  return '...'
}

function func10(){
  return '...'
}

function func11(){

  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 15)
  
  _.forEach(items, function(d){
      if(_.some(d.Samples,function(s){
          return s == 1 || s == 3 || s == 4}))
      {
        //console.log("tru")
        pos = [d.Latitude, d.Longitude]
        var circle = L.circle(pos, 10, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);
      }
  })
  return '...'
  }


function func12(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 15)
  
  _.forEach(items, function(d){
      if(_.some(d.Samples,function(s){
          return s == 7 || s == 13}))
      {
        //console.log("tru")
        pos = [d.Latitude, d.Longitude]
        var circle = L.circle(pos, 10, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);
      }
  })
  return '...'
}
