function InfoTable({ rows = [] }) {
    return (
        <table>
            <tbody>
                {rows.map(([label, value], index) => (
                    <tr key={index}>
                        <td>
                            <p>
                                <span className="highlight">
                                    {label}:
                                </span>
                            </p>
                        </td>

                        <td>
                            {value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InfoTable;