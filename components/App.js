var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'jyhE0t6QA2xf6kStYMKFbdxMa7I1PogE';

App = React.createClass({

    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) {
        this.setState({
          loading: true
        });
        this.getGif(searchingText)
        .then(response =>
              this.setState({
              loading: false,
              gif: response,
              searchingText: searchingText
            })
      ).catch(error => console.error('Something went wrong', error));
      },
    
      getGif: function(searchingText) { // 1.
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        return new Promise(
            function(resolve, reject) {
              const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; // 4.
                        var gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(
                    `XMLHttpRequest Error: ${this.statusText}`));
                };
                xhr.send();
            });
        },


    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search 
                onSearch={this.handleSearch} />
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl} />
          </div>
        );
    }
});




//  //2. This method sets state loading to true and calls getGif function.

//  handleSearch: function(searchingText) {
//     this.setState({
//       loading: true
//     });
//     this.getGif(searchingText)
//     .then(response =>
//           this.setState({
//           loading: false,
//           gif: response,
//           searchingText: searchingText
//         })
//   ).catch(error => console.error('Something went wrong', error));
//   },

// //.3. This method gets gif from giphy.com and returns gif object as callback

//    getGif: function(searchingText) {
//       const url = GIPHY_API_URL + 'v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
//     return new Promise(
//       function(resolve, reject) {
//         const xhr = new XMLHttpRequest();
//           xhr.open('GET', url);
//           xhr.onload = function(){
//               if (this.status === 200) {
//                 var data = JSON.parse(xhr.responseText).data;
//                 var gif = {
//                     url: data.fixed_width_downsampled_url,
//                     sourceUrl: data.url
//                   };
//                 resolve(gif);
//               } else {
//                   reject(new Error(this.statusText));
//                 }
//           };
//           xhr.onerror = function() {
//               reject(new Error(
//                 `XMLHttpRequest Error: ${this.statusText}`));
//           };
//           xhr.send();
//         });
//       },


//   render: function() {
//     var styles = {
//       margin: '0 auto',
//       textAlign: 'center',
//       width: '90%'
//     };

//     return (
//       <div style={styles}>
//           <h1>GIFs search engine!</h1>
//           <p>Find a gif on <a href='http://giphy.com'>giphy</a>. Push enter to get another gif </p>
//           <Search onSearch={this.handleSearch} />
//         <Gif
//               loading={this.state.loading}
//               url={this.state.gif.url}
//               sourceUrl={this.state.gif.sourceUrl} />
//       </div>
//     );
//   }
// });