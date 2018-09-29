# Search box -> Live Demo http://www.blueocean5.com/locus/

# Description:
This project has a search box which allows us to search for users like type-ahead. It uses both mouse as well as keypad events to navigate
the searched dropdown list and special care is taken for preventing unnecessary event triggers. It uses `ScrollIntoView` to 
scroll the element into the dropdown list and implemented in a way that it only scrolls the element if needed.

# Tech Stack:
Html, CSS, JavaScript, AngularJS 

# External libraries used: 
Only font awesome to use search icon in the search box

# How to use this project
1. Initialize git in your folder where you want to clone this repository.

    `git init`
    
2. Clone the repository by running the command:

     `git clone https://github.com/himanshu206/locus.git`
     
3. After successfull cloning the project, go to folder `locus` and run command in terminal

   `npm install`
   
4. After loading dependencies via node package manager, build the project by runnning command:

    `grunt`
    
5. Then, go to dist folder and run command:

      `live-server`
      
# In short run commands in terminal in this sequence:
1. `mkdir locus-repo` -> To create folder locus-repo in your machine
2. `cd locus-repo` -> Go inside locus-repo folder
3. `git init` -> To initialize git in your folder
4. `git clone https://github.com/himanshu206/locus.git` -> To clone this repo in your local folder
5. `npm install` -> To load dependencies via node package manager
6. `grunt` -> to build distributed package
7. `cd dist` -> Go inside dist folder
8. `live-server` -> To open built project in your browser

# Screenshots of working project:

![alt text](http://blueocean5.com/locus-images/a.png)
![alt text](http://blueocean5.com/locus-images/b.png)

