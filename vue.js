let webstore = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        order: {
            firstName: "",
            lastName: "",
        },
        sort: {
            attributes: "price",
            option: "",
        },
        products: null,
        cart: [],
        showProduct: true,
        search: "",
        phone_value: "",
    },
    created: () => {
        fetch("https://cw2-web-app.herokuapp.com/collection/lessons/search/")
          .then((response) => {
            return response.json();
          })
          .then((_lessons) => {
            webstore.products = _lessons;
            console.log(webstore.products.length);
          });
      },

    methods: {

        // acceptNumber() function for phone number feild to allow only numbers being inputted

        acceptNumber() {
            var x = this.phone_value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.phone_value = !x[2] ? x[1] : x[1] + x[2] + (x[3] ? + x[3] : '');
        },

        // isLetter(e) function for name feild to allow only letters being inputted

        isLetter(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[A-Za-z]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text
        },

        // addToCart(product) function adds lesson to the  cart array and reduces the lesson space by 1

        addToCart(product) {
            product.space = product.space - 1;
            this.cart.push(product)
            // fetch("http://localhost:3000/collection/orders", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     firstName: this.order.firstName,
            //     lastName: this.order.lastName,
            //     phone: this.phone_value
            // }),
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            // })
            //   .then((response) => response.json())
            // //   .then((res) => {
            // //     this.updateLessonSpaces();
            // //   })
            ;
        },

        // removeToCart(index, d) function for loops through the product array checking if the product id matches 
        // the cart id. if it does it adds 1 to the product space (number of product) and 
        // removes that product object from the cart array

        removeToCart(index, d) {
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i]._id === d) {
                    this.products[i].space = this.products[i].space + 1;
                }
            };
            this.cart.splice(index, 1);

        },

        // checks if showProduct is true or false and outputs the opposite 
        // used to switch pages from cart to lesson page

        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        filterLesson(){
            fetch("https://cw2-web-app.herokuapp.com/collection/lessons/search/" + this.search)
            .then((response) => {
              return response.json();
            })
            .then((_lessons) => {
              webstore.products = _lessons;
              console.log(webstore.products.length);
            });
        },

        // after checkout button pressed shows user "order submitted"

        // without the for loop u can get all 
        submitForm() { 
            // for (var i = 0; i < this.cart.length; ++i){
            fetch("https://cw2-web-app.herokuapp.com/collection/orders/search/", {
                method: "POST",
                body: JSON.stringify({
                  firstName: this.order.firstName,
                  lastName: this.order.lastName,
                  phone: this.phone_value,
                //   lessonid:this.cart[i]._id,
                //   lessonName: this.cart[i].topic,
                //   lessonSpace: this.cart[i].space,
                //   lessonid: this.cart.map(a => a._id),
                //   space: this.cart.map(({ space, topic }) => ({ space, topic })),//space
                
                  lessons:this.cart.map((item) => {
                    return {
                      _id: item._id,
                      spaces: item.space,
                      topic: item.topic,
                    };
                  }),
                  
              }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((res) => {
                //   this.updateLessonSpaces();
                // console.log(this.cart[1]._id)
                 for (var i = 0; i < this.cart.length; ++i){
                    console.log(this.cart[i]._id)
                fetch("https://cw2-web-app.herokuapp.com/collection/lessons/" + this.cart[i]._id, {
                    method: "PUT",
                    body: JSON.stringify({
                        space: this.cart[i].space
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    // .then((res) => {
                    //   this.isLoading = false;
                    //   alert("Order submitted successfully!");
                    //   location.reload();
                    // });
                    } 
                })
            // } // for loop ends
            
            alert('order submitted!') 
            // location.reload();
        },



        // check out button disable when any feilds are empty

        checkoutDisable(first,second,phone){
            if(first.length>0 && second.length>0 && phone.length>0){
                return false;
            }
            else{
                return true;
            }

        },

        // checks if lesson spaces is more then 0 so they can add to cart

        canAddToCart(product) {
            return product.space > 0;
        },

        // for loop through cart and counts the items

        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === id) {
                    count++;
                }
            }
            return count;

        },

        // sorts acending order by comparing products attributes from one another ordering them 

        sortLowToHigh(n) {

            if (n == "price") {
                return this.products.sort((a,b) => a.price > b.price ? 1 : -1);
                    return 0;
            }
            else if (n == "location") {

                return this.products.sort((a,b) => a.location > b.location ? 1 : -1);
                return 0;
            }
            else if (n == "space") {

                return this.products.sort((a,b) => a.space > b.space ? 1 : -1);
                return 0;
            }
            else if (n == "topic") {

                return this.products.sort((a,b) => a.topic > b.topic ? 1 : -1);
                return 0;
            }

        },

         // sorts decending order by comparing products attributes from one another, ordering them 

        sortHighToLow(n) {
            if (n == "price") {
                return this.products.sort((a,b) => a.price < b.price ? 1 : -1);
                return 0;
            }

            else if (n == "location") {
                return this.products.sort((a,b) => a.location < b.location ? 1 : -1);
                return 0;
            }
            else if (n == "space") {
                return this.products.sort((a,b) => a.space < b.space ? 1 : -1);
                return 0;
            }
            else if (n == "topic") {
                return this.products.sort((a,b) => a.topic < b.topic ? 1 : -1);
                return 0;
            }

        },

        // checks if user chose decending or acending and orders them with above functions

        sort_a_d(n) {
            if (n == "decending") {
                this.sortHighToLow(this.sort.attributes)
            }
            else if (n == "acending") {
                this.sortLowToHigh(this.sort.attributes)
            }
        }

    },
    computed: {

        // filters the lesson while the user searches

        filteredProducts: function () {
            console.log(this.products)
            return this.products.filter((product) => {
                return product.topic.toLowerCase().match(this.search.toLowerCase());
            });
        },
        // filterLesson: function (){
        //     fetch("http://localhost:3000/collection/lessons/search/")
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((_lessons) => {
        //       webstore.products = _lessons;
        //       console.log(webstore.products.length);
        //     });
        // }

    },



});