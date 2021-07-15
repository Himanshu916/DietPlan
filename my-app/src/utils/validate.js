import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name:Yup.string().required("Required"),
    email:Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
    phone:Yup.number().typeError("Please Enter Valid Number").required("Required"),
    gender:Yup.string().oneOf(["male","female"],"Required").required("Required"),
    weight:Yup.number().typeError("Please Enter Valid Weight").required("Required"),
    height:Yup.number().typeError("Please Enter Valid Height").required("Required"),
    age:Yup.number().typeError("Please Enter Valid Age").required("Required"),
    lifestyle:Yup.string().oneOf(["seden","lowActive","Active","veryActive","extremelyActive"]).required("Required"),
    nutritionPref:Yup.string().oneOf(["veg","nonveg","vegwithegg"],"Required").required("Required"),
    carbs: Yup.number().typeError("Please Enter Valid Carbs").required("Required"),
    proteins: Yup.number().typeError("Please Enter Valid Proteins").required("Required"),
    numberOfMeals: Yup.number().typeError("Please Enter Valid No. of Meals").required("Required"),
    numberOfSnacks: Yup.number().typeError("Please Enter Valid No. of Snacks").required("Required"),
    caloriesPerSnack: Yup.number().typeError("Please Enter Valid Calorie").required("Required"),
    deficitPercentage:Yup.number().typeError("Please Enter Valid Deficit Percentage").required("Required")
})