class library {
    constructor(bookname) {
        this.bookname = bookname;
    }
    use() {
        return this.bookname + " is used by";
        console.log("used");

    }
}

let book = new library("The lost world");
console.log(book.use());


class user extends library {
    constructor(bookname, email) {
        super(bookname);
        this.email = email;
    }
    login() {
        return this.use();
    }
}

let user1 = new user();