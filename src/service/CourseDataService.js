
import axios from 'axios'
const INSTRUCTOR = 'in28minutes'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`
class CourseDataService {
    
    retrieveAllCourses(name) {
        return axios.get(`${INSTRUCTOR_API_URL}/courses`);
    }
    deleteCourse(name,id){
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }
    retrieveCourse(name, id){
        return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }
    updateCourse(name,id,course){
        return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
    }
    createCourse(name, course) {
        return axios.post(`${INSTRUCTOR_API_URL}/courses/`, course);
    }



    

    createProduct(type, category, product){
        return axios.post(`${COURSE_API_URL}/managment/${type}/${category}`,  product);
    }

    updateProduct(type, category, product){
        return axios.put(`${COURSE_API_URL}/managment/${type}/${category}`,  product);
    }

    deleteProduct(type, category, id){
        return axios.delete(`${COURSE_API_URL}/managment/${type}/${category}/${id}`);
    }


    retrieveProduct(type,category,id){
        return axios.get(`${COURSE_API_URL}/${type}/${category}/${id}`);
    }

    retrieveAllProducts(){
        return axios.get(`${COURSE_API_URL}`);
    }

    retrieveAllProductsByType(type) {
        return axios.get(`${COURSE_API_URL}/${type}`);
    }

    retrieveAllProductsByTypeAndCategoryId(type, category){
        return axios.get(`${COURSE_API_URL}/${type}/${category}`);
    }

    
    retrieveAllManagmentProducts(){
        return axios.get(`${COURSE_API_URL}/managment`);
    }

    retrieveAllManagmentProductsByType(type) {
        return axios.get(`${COURSE_API_URL}/managment/${type}`);
    }

    retrieveAllManagmentProductsByTypeAndCategoryId(type, category){
        return axios.get(`${COURSE_API_URL}/managment/${type}/${category}`);
    }
}


export default new CourseDataService()