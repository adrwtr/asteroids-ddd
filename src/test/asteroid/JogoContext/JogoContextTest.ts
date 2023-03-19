import { expect } from 'chai';
import { createInjector } from 'typed-inject';

import { JogoService } from "../../../asteroid/JogoContext/JogoService";
import { JogoConsoleRepository } from "../../../asteroid/JogoContext/JogoConsoleRepository";
import { LogService } from "../../../asteroid/SharedContext/LogService";
import { JogoEntity } from "../../../asteroid/JogoContext/JogoEntity";

describe('Teste do contexto do Jogo', () => {
    it('Teste da Entidade', () => {
        let objJogoEntity = new JogoEntity(10);
        expect(objJogoEntity.getVidas()).to.be.equal(10);
        expect(objJogoEntity.getTempoJogo()).to.be.equal(0);

        // testa se o fim de jogo for setado
        objJogoEntity.setTempoFimJogo();
        expect(objJogoEntity.getTempoJogo()).to.be.equal(0.001);
    });

    it('Teste do Serviço Jogo', () => {
        const appInjector = createInjector()
            .provideClass('JogoConcreteRepository', JogoConsoleRepository);

        let objJogoService = new JogoService(
            appInjector.resolve('JogoConcreteRepository')
        );

        LogService.limparLog();

        objJogoService.iniciarJogo();
        objJogoService.reiniciarJogo();
        objJogoService.verMenuInicial();
        objJogoService.verTelaPontuacao();

        let arrMensagens = LogService.getMensagens();

        expect(arrMensagens).to.deep.equal(
            [
                'Log iniciado'
                , 'Jogo iniciado'
                , 'Jogo reiniciado'
                , 'Mostrar menu inicial'
                , 'Mostrar tela de pontuação'
            ]
        );
    });
});