import { useState } from 'react';
import Header from './components/Header';
import Sanctuary from './sections/Sanctuary';
import RoomCards from './sections/RoomCards';
import Amenities from './sections/Amenities';
import FloraFauna from './sections/FloraFauna';
import FloraFaunaPage from './pages/FloraFaunaPage';
import GalleryPage from './pages/GalleryPage';
import DirectBookingModal from './components/DirectBookingModal';
import BookingForm from './sections/BookingForm';
import FeedbackReviews from './sections/FeedbackReviews';
import Location from './sections/Location';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

export default function App() {
  const [selectedRoomId, setSelectedRoomId] = useState('room-1');
  const [directBookingOpen, setDirectBookingOpen] = useState(false);

  // Keep the flora & fauna catalogue as a real page while preserving the
  // existing landing-page experience.
  if (window.location.pathname === '/flora-fauna') {
    return <FloraFaunaPage />;
  }

  if (window.location.pathname === '/gallery') {
    return <GalleryPage />;
  }

  return (
    <>
      <div id="grange-app-shell" className="min-h-screen bg-[#faf7f2] font-sans antialiased text-[#1c1a18]">
      <Header onBookNowClick={() => setDirectBookingOpen(true)} />
      <Sanctuary />
      <RoomCards selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} onDirectBook={() => setDirectBookingOpen(true)} />
      <Amenities />
      <FloraFauna />
      <BookingForm selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
      <FeedbackReviews />
      <Location />
      <FAQ />
      <Footer />
      </div>
      <DirectBookingModal open={directBookingOpen} onClose={() => setDirectBookingOpen(false)} />
    </>
  );
}
