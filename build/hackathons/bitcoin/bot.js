//
// TODO: implement the logic to decide whether or not to make a trade
//

//people game might make it go up?
//good could be a minus one
three_before = false
two_before = false
one_before = false

function decideWhetherOrNotToTrade(tweet){
    keys = ['game', 'money', 'fun', 'good', 'actor', 'news', 'movies', 'tech', 'music', 'people', 'apple', 'google']
    pluskeys = ['game', 'news', 'movies', 'tech', 'music', 'people']
    negkeys = ['money', 'fun', 'good', 'actor', 'apple']

    var positive = (_.reduce(pluskeys, function(p, n) {
        return p || tweet.includes(n)
    }, false))
    var negative = (_.reduce(negkeys, function(p, n) {
        return p || tweet.includes(n)
    }, false))

    var trade = false

    if ((!positive) && (!negative)) {
        trade = false
    } else if (bank.currency === 'USD') {
        trade = (positive)?false:true
    } else {
        trade = (positive)?true:false
    }

    var buffer = three_before

    three_before = two_before
    two_before = one_before
    one_before = trade

    return buffer
}