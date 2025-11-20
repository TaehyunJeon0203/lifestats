import { ProfileDialog } from "../profile-dialog";

export default function ProfileForm() {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Lifestats</h1>
                <p>당신의 인생통계</p>
            </div>
            <ProfileDialog />
        </div>
    );
}