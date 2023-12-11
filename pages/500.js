import Error from "@/components/Error";

export default function Custom500() {
    return <Error statusCode={500} />;
}