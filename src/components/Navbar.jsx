import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 mix-blend-multiply">
            <div className="flex justify-between items-center p-4 ">
                <h1 className="text-xl mix-blend-multiply ">UNSCRIPTED.AGENCY</h1>
                <div className="flex space-x-4">
                    <a href="mailto:example@example.com" className="flex items-center">
                        <Mail className="mr-1" />
                    </a>
                    <a href="tel:+1234567890" className="flex items-center">
                        <Phone className="mr-1" />
                    </a>
                    <a href="https://www.linkedin.com/in/yourprofile" className="flex items-center" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-1" />
                    </a>
                    <a href="https://www.instagram.com/yourprofile" className="flex items-center" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-1" />
                    </a>
                </div>
            </div>
        </div>
    );
}