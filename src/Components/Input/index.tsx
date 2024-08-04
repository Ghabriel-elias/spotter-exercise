import { FiSearch } from 'react-icons/fi'
import * as S from './style'

interface InputProps {
    searchByName: (term: string) => void;
}

export const Input = ({
    searchByName    
}: InputProps) => (
    <S.BoxInput>
        <FiSearch />
        <S.TextInput
            placeholder='Search Legal name'
            onChange={(e) => searchByName(e.target.value)}
        />
    </S.BoxInput>
)