import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import villagerImg from '@/assets/villager.png';
import { useLanguages } from '@/data/languages';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type VillagerView = 'menu' | 'suggest' | 'random';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const VillagerChat = () => {
  const { data: languages = [] } = useLanguages();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<VillagerView>('menu');
  const [suggestName, setSuggestName] = useState('');
  const [suggestEmail, setSuggestEmail] = useState('');
  const [suggestInfo, setSuggestInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [infoError, setInfoError] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setView('menu');
    setSubmitted(false);
    setEmailError('');
    setNameError('');
    setInfoError('');
  };

  const validateForm = (): boolean => {
    let valid = true;

    const trimmedName = suggestName.trim();
    if (!trimmedName) {
      setNameError('Name is required.');
      valid = false;
    } else if (trimmedName.length > 100) {
      setNameError('Name must be under 100 characters.');
      valid = false;
    } else {
      setNameError('');
    }

    const trimmedEmail = suggestEmail.trim();
    if (!trimmedEmail) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    const trimmedInfo = suggestInfo.trim();
    if (!trimmedInfo) {
      setInfoError('Please tell us about the language.');
      valid = false;
    } else if (trimmedInfo.length > 1000) {
      setInfoError('Description must be under 1000 characters.');
      valid = false;
    } else {
      setInfoError('');
    }

    return valid;
  };

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
    setSuggestName('');
    setSuggestEmail('');
    setSuggestInfo('');
  };

  const handleRandom = () => {
    if (languages.length === 0) return;
    const random = languages[Math.floor(Math.random() * languages.length)];
    setOpen(false);
    navigate(`/language/${random.id}`);
  };

  const handleHome = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="group cursor-pointer bg-transparent border-none p-0"
        title="Talk to the Villager"
      >
        <img
          src={villagerImg}
          alt="Minecraft Villager"
          className="w-20 h-20 object-contain hover:scale-110 transition-transform drop-shadow-lg"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="minecraft-border bg-card border-0 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-sm text-foreground text-center">
              Language Villager
            </DialogTitle>
            <DialogDescription className="font-pixel-body text-lg text-muted-foreground text-center">
              {view === 'suggest' && submitted
                ? ''
                : 'Hmmm... How can I help you, adventurer?'}
            </DialogDescription>
          </DialogHeader>

          {view === 'menu' && (
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => { setView('suggest'); setSubmitted(false); setEmailError(''); setNameError(''); setInfoError(''); }}
                className="minecraft-btn px-4 py-3 font-pixel text-[9px] text-foreground text-left leading-relaxed"
              >
                Suggest a missing language
              </button>
              <button
                onClick={handleRandom}
                className="minecraft-btn px-4 py-3 font-pixel text-[9px] text-foreground text-left leading-relaxed"
              >
<<<<<<< HEAD
                Take me on a language adventure!
=======
                Take me on a language adventure
>>>>>>> 4186266 (aligning everything with databse)
              </button>
              <button
                onClick={handleHome}
                className="minecraft-btn px-4 py-3 font-pixel text-[9px] text-foreground text-left leading-relaxed"
              >
                Back to the main menu
              </button>
            </div>
          )}

          {view === 'suggest' && !submitted && (
            <form onSubmit={handleSuggest} className="flex flex-col gap-3 mt-2">
              <p className="font-pixel-body text-lg text-muted-foreground">
                Can't find a language? Tell us about it and we'll look into adding it!
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={suggestName}
                  onChange={(e) => { setSuggestName(e.target.value); setNameError(''); }}
                  maxLength={100}
                  className="w-full px-3 py-2 bg-background border-2 border-border font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
                {nameError && <p className="font-pixel text-[7px] text-destructive mt-1">{nameError}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={suggestEmail}
                  onChange={(e) => { setSuggestEmail(e.target.value); setEmailError(''); }}
                  maxLength={255}
                  className="w-full px-3 py-2 bg-background border-2 border-border font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
                {emailError && <p className="font-pixel text-[7px] text-destructive mt-1">{emailError}</p>}
              </div>
              <div>
                <textarea
                  placeholder="Tell us about the language (name, region, any info you have)..."
                  value={suggestInfo}
                  onChange={(e) => { setSuggestInfo(e.target.value); setInfoError(''); }}
                  maxLength={1000}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border-2 border-border font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
                />
                {infoError && <p className="font-pixel text-[7px] text-destructive mt-1">{infoError}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView('menu')}
                  className="minecraft-btn px-4 py-2 font-pixel text-[9px] text-foreground"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="minecraft-btn flex-1 px-4 py-2 font-pixel text-[9px] text-foreground"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

          {view === 'suggest' && submitted && (
            <div className="text-center py-4">
              <p className="font-pixel-body text-lg text-muted-foreground mb-4">
                Thank you for your submission! Our team will review it and get back to you via email.
              </p>
              <button
                onClick={() => setView('menu')}
                className="minecraft-btn px-4 py-2 font-pixel text-[9px] text-foreground"
              >
                ← Back to menu
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VillagerChat;
