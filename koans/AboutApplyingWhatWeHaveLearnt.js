var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(x => x.containsNuts === false).filter(x => !(x.ingredients.some(y => y == "mushrooms")));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1000).map((_, i) => i).filter(i => i % 3 === 0 || i % 5 == 0).reduce((total, x) => total + x, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).map(product => {
      product.ingredients.map(ingredient => {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      });
    });

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    function isPrime(n) {
      if (n === 2 || n === 3) {
        return true;
      }
      for (var i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }

    function largestPrimeFactor(n) {
      while (isPrime(n) === false) {
        for (var i = 2; i < n; i++) {
          if (n % i === 0) {
            n = n / i;
            break;
          }
        }
      }
      return n;
    }

    expect(largestPrimeFactor(12)).toBe(3);
    expect(largestPrimeFactor(14)).toBe(7);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalindrome(a, b) {
      var product = a * b;
      var digits = {};
      product.toString().split("").map(d => digits[d] = (digits[d] || 0) + 1);
      var even_count_digits = _.keys(digits).map(d => Number(d)).filter(d => digits[d] % 2 === 0);
      var odd_count_digits = _.keys(digits).map(d => Number(d)).filter(d => digits[d] % 2 === 1);
      var result = "";
      if (odd_count_digits.length != 0) {
        result += _.max(odd_count_digits);
      }
      while (even_count_digits.length > 0) {
        var max_even = _.max(even_count_digits);
        var idx = _.indexOf(even_count_digits, max_even);
        even_count_digits.splice(idx, max_even);
        result = max_even + result + max_even;
      }
      return Number(result);
    }

    expect(largestPalindrome(242,457)).toBe(191);
    expect(largestPalindrome(863,457)).toBe(39493);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function gcd(a,b) {
      var temp = 0;
      while(a !== 0){
        temp = a;
        a = b % a;
        b = temp;
      }
      return b;
    }

    function lcm(a, b) {
      return (a * b / gcd(a,b));
    }

    function leastCommonMultiple(first, last) {
      var numberList = _.range(first, last);
      return _.reduce(numberList, lcm, 1);
    }
    expect(leastCommonMultiple(1,20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function squaresDifference(arr) {
      function sum(a, b) {
        return a + b;
      }
      squareOfSums = (_(arr).reduce(sum, 0))**2;
      sumOfSquares = _(arr).map(x => x**2).reduce(sum, 0);
      return squareOfSums - sumOfSquares;
    }

    expect(squaresDifference([1,2,3])).toBe(22);
  });

  it("should find the 10001st prime", function () {
    var primes = [2];

    function isPrime(n) {
      if (n === 2 || n === 3) {
        return true;
      }
      for (var i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }

    function nthPrime(n) {
      var i = primes[primes.length-1];
      while (primes.length < n) {
        i++;
        if (isPrime(i)) {
          primes.push(i);
        }
      }
      return primes[primes.length-1];
    }

    expect(nthPrime(1001)).toBe(7927);
  });
});
