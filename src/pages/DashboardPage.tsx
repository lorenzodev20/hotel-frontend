import { useAuth } from "../hooks/useAuth"

export default function DashboardPage() {
    const { userAuth } = useAuth();
    return (<h2 className="text-4xl">{`Bienvenido ${userAuth.name}`}</h2>)
}
