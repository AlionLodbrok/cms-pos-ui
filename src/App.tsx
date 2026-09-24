import { useState } from 'react';
import { Init as InitLogin } from '@/modules/main/frm_login';
import { Init as InitSideBar, type CurrentModule } from '@/modules/main/components/uc_sidebar'
import { Init as InitHeader } from '@/modules/main/components/uc_header'
import { Init as InitArqueo } from '@/modules/arqueo/frm_arqueo'
import { Show as ShowAccounts} from '@/modules/accounts/frm_accounts'

function App() {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<CurrentModule>('accounts');

  if (!userSession) {
    return <InitLogin onLoginSuccess={(user) => setUserSession(user)} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* 1. Menú Lateral Reutilizable */}
      <InitSideBar
        currentModule={currentModule}
        onSelectedModule={setCurrentModule}
        onClose={() => setUserSession(null)}
      />

      {/* 2. Contenedor Principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        < InitHeader/>

        <main className="p-6 max-w-7xl w-full mx-auto">
          {currentModule === 'arqueo' && (
            < InitArqueo/>
          )}
          {currentModule === 'accounts' && (
            < ShowAccounts/>
          )}
        </main>
      </div>

    </div>
  );
}

export default App
