import {createExamUserError} from '../../api/api'
import * as Cookies from "js-cookie"
export default {
    addExamUserError(examId,answer){
        let param = {
            userId:Cookies.get('userid'),
            examQuestionId:examId,
            errorAnswer:answer
        }
        createExamUserError(param).then(res=>{
            if(res.success){
                console.log('加入错题集成功')
            }else{
                console.log(res.error.message)
            }
        })
    }
}