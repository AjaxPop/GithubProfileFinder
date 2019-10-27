//Make sure the Jquery document is ready to execute
$(function () {

    //Execute the following code only once when the user hits the submitButton.
    $('#submitButton').one('click', function () {

        //Get the userName that the user is searching for 
        const username = $('#userName').val();

        //Get the github username link
        const hubLink = 'https://api.github.com/users/' + username;

        //Load the hubLink from the server using a HTTP GET request.
        $.get(hubLink)

            /*done(function (json) - A Success callback using the .done() method.  
            *Parameter JavaScript Object Notation(json)
            */ 
            .done(function (json) {
                /* fullName -  Get the json.name
                 * userName -  Get the json.login
                 * avatarUrl - Get the json.avatar_url
                 * followers - Get the json.followers
                 * following - Get the json.following
                 * repoNum -   Get the json.public_repos
                 */

                let fullName = json.name;   
                let userName = json.login; 
                let avatarUrl = json.avatar_url;
                let followers = json.followers;
                let following = json.following;
                let repoNum = json.public_repos;

                    //If the GitHub user hasn't set up their name on Github. Set fullname to their login name 
                    if (fullName == null) {
                        fullName = json.login;
                    }

                    //Create the elment h2 for displayNames
                    let displayNames = document.createElement("h2");
                    displayNames.innerHTML = fullName + '(' + '@' + userName + ')';

                    //Create the elment img for displayNames
                    let aviImg = $(document.createElement('img'));

                    //Set the attribute  src
                    aviImg.attr('src', avatarUrl);

                    //Set the attribute  width
                    aviImg.attr('width', 150);

                    //Set the attribute  height
                    aviImg.attr('height', 150);

                    //Create the elment h3 for displayNames
                    let displayFollowers = document.createElement("h3");

                    //inserting data into displayFollowers
                    displayFollowers.innerHTML = "Followers: " + followers;

                    //Create the elment h3 for displayNames
                    let displayFollowing = document.createElement("h3");

                    //inserting data into displayFollowing
                    displayFollowing.innerHTML = "Following: " + following;

                    //Create the elment h3 for displayNames
                    let displayRepos = document.createElement("h3");

                    //inserting data into displayFollowing
                    displayRepos.innerHTML = "Repositories: " + repoNum;

                    //Insert html to the beginning of each element and display it
                    $('#data').prepend(displayNames, aviImg, displayFollowers, displayFollowing, displayRepos);
            })

            //A failure callback happened 
            .fail(function () {
                    //Tell the user that they will have to try again due to the failure callback(Couldn't find the GitHub username.)
                    $('#data').html("<h1>Try again.</h1>");
            });
    });
});
