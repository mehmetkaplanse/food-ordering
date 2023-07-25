import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";

const handler = async (req,res) => {
    await dbConnect();

    const {method} = req;

    if(method === "GET") {
        try {
            const footers = await Footer.find();
            res.status(200).json(footers);
        } catch (error) {
            console.log(error);
        }
    }

    
    if(method === "POST") {
        try {
            const newFooter = await Footer.create(req.body);
            res.status(200).json(newFooter);
        } catch (error) {
            console.log(error);
        }
    }

    
}

export default handler