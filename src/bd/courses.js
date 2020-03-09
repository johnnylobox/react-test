const CoursesApi = {
    courses:[
        {
            id: 1, 
            name: "Javascript", 
            days: [
                {
                    name: "Monday", 
                },
                {
                    name: "Wednesday",
                }
            ],
        },
        {
            id: 2, 
            name: "PHP Advanced Topics", 
            days: [
                {
                    name: "Tuesday",
                },
                {
                    name: "Thursday",
                }
            ],
        },
        {
            id: 3, 
            name: "NoSQL", 
            days: [
                {
                    name: "Monday", 
                },
                {
                    name: "Friday",
                }
            ],
        },
        {
            id: 4, 
            name: "UX Experts", 
            days: [
                {
                    name: "Tuesday",
                },
                {
                    name: "Friday"
                }
            ],
        },
        {
            id: 5, 
            name: "Design patterns", 
            days: [
                {
                    name: "Saturday",
                }
            ],
        },
    ],
    all(){
        return this.courses;
    },
    get(id){
        return  this.courses.find(
                    key => key.id === id
                );
    }
}

export default CoursesApi;