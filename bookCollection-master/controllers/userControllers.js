import passport from "passport";
import routes from "../routes.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Review from "../models/Review.js";

import localStorage from "localStorage";
import session from "express-session";
import { runInNewContext } from "vm";
import request from "request";
import querystring from "query-string";


export const home = (req, res) => res.render("home");

export const getJoin = (req, res) => res.render("join");
   
export const postJoin = async(req, res, next) => {

    const {
        body: {email, password}
    } = req;

    try{        
        const user = new User({
            email,
            password
        })
        
        await User.register(user, password);

        res.redirect(routes.intro);

    }catch(error){
        if(error.name == "UserExistsError"){
            console.log(error);
            res.status(409).send('User already Exists');
        }
    }
}

export const getLogin = (req, res) => res.render("mylibrary");
export const postLogin1 = passport.authenticate('local',{
    failureRedirect: routes.home,
    successRedirect: routes.mylibrary
}); 

export const postLogin2 = passport.authenticate('local',{
    failureRedirect: routes.home,
    successRedirect: routes.intro
}); 
 

export const facebookLogin = passport.authenticate("facebook", {failWithError: true});

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) =>{
    console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const getProfile = (req, res) =>{
    res.render("profile");
}


export const logout = (req, res) => {
    req.flash("info", "Logged out, see you later");
    req.session.destroy();
    req.logout();
    res.redirect(routes.home);

}
export const page1 = (req, res) => res.render("page1");
export const myPage = (req, res) => res.render("mypage");
export const myLibrary = (req, res) => res.render("mylibrary");

export const getIntro = (req, res) => res.render("intro");

export const postIntro = async(req, res) => {

     const {
         body: {bookName, author, starPoint},
         user
     } = req;

     try{

        let searchedBook = Book.findOne({'title': bookName}).exec();
        console.log(searchedBook);
        let book;

        if(searchedBook != NULL){
            book = searchedBook;
        }else{
            book = await Book.create({
                title: bookName,
                author: author,
                starPoint: starPoint
            })
        }

        res.status(200).json({key: book._id});

    }catch(error){
        console.log(error);
    }
     
}


export const getBookPage = (req, res) => res.render("bookpage");
export const postBookPage = async(req, res) => {

    const {
        body: {bookReview},
        user
    } = req;


    try{        
        const review = await Review.create({
            text: bookReview,
            creator: req.user._id
        })

        res.status(200).json({key: review._id});

    }catch(error){
        console.log(error);
        res.redirect(routes.bookpage);
    }   
}





