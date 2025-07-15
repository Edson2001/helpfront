import { Metadata } from "next";
import SectionHeader from "../home/components/Common/SectionHeader";
 

export const metadata: Metadata = {
  title: "Política de Privacidade - RedHelp",
  description: "Conheça nossas políticas de privacidade e proteção de dados",
};

export default function PrivacyPolicy() {
  return (
    <section className="pt-15 lg:pb-25 xl:pb-30 pb-20">
      <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
        <div className="animate_top mx-auto">
          <SectionHeader
            headerInfo={{
              title: `POLÍTICA DE PRIVACIDADE`,
              subtitle: `Proteção de Dados`,
              description: `Conheça como protegemos e tratamos suas informações.`,
            }}
          />

          <div className="mt-10 space-y-6 text-justify">
            <div>
              <h3 className="mb-3 text-xl font-semibold">1. Introdução</h3>
              <p>
                A RedHelp está comprometida em proteger a privacidade e
                segurança dos dados de seus usuários. Esta Política de
                Privacidade explica como coletamos, usamos, compartilhamos e
                protegemos suas informações quando você utiliza nossos serviços.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">2. Dados Coletados</h3>
              <p>
                Podemos coletar informações pessoais como nome, e-mail, telefone
                e dados de uso da plataforma. Esses dados são necessários para
                fornecer nossos serviços e melhorar sua experiência.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">3. Uso dos Dados</h3>
              <p>
                Utilizamos seus dados para: fornecer e melhorar nossos serviços,
                comunicar-se com você, personalizar sua experiência e cumprir
                obrigações legais.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">
                4. Compartilhamento de Dados
              </h3>
              <p>
                Não compartilhamos seus dados pessoais com terceiros, exceto
                quando necessário para fornecer nossos serviços ou quando
                exigido por lei.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">5. Segurança</h3>
              <p>
                Implementamos medidas técnicas e organizacionais para proteger
                seus dados contra acesso não autorizado, alteração ou
                destruição.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">6. Seus Direitos</h3>
              <p>
                Você tem o direito de acessar, corrigir, excluir ou limitar o
                uso de seus dados pessoais. Para exercer esses direitos, entre
                em contato conosco.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">
                7. Alterações na Política
              </h3>
              <p>
                Podemos atualizar esta política periodicamente. Recomendamos que
                você revise esta página regularmente para se manter informado
                sobre como protegemos suas informações.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">8. Contato</h3>
              <p>
                Para dúvidas sobre esta política ou tratamento de seus dados,
                entre em contato através do e-mail:{" "}
                <a href="mailto:geral@redeveloper.ao" className="text-primary">
                  geral@redeveloper.ao
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
